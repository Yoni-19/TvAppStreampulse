import React, { useActionState, useEffect } from 'react'; // Hook de React 19
import { useFormStatus } from 'react-dom';
import { useNavigate } from 'react-router-dom';

// 1. Definimos el tipo para el estado del formulario
interface FormState {
  error: string | null;
  success: boolean;
}

// 2. Esta función ahora recibe el estado previo y los datos del formulario
async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
  // Simulamos delay de red
  await new Promise(res => setTimeout(res, 1500));

  const email = formData.get("email");
  const password = formData.get("password");

  // Validación básica de ejemplo
  if (email === "test@gmail.com" && password === "123456") {
    return { error: null, success: true };
  } else {
    return { error: "Credenciales incorrectas. Intenta con test@gmail.com / 123456", success: false };
  }
}

export default function LoginPage() {
  // 3. useActionState recibe: (la función acción, el estado inicial)
  // Devuelve: [el estado actual, la acción que pondremos en el form]

  const navigate = useNavigate();

  const [state, formAction] = useActionState(loginAction, {
    error: null,
    success: false
  });

  useEffect(() => {
    if (state.success) {
      localStorage.setItem('isAuthenticated', 'true');
      
      const timer = setTimeout(() => {
        navigate('/');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [state.success, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-secondary/20 rounded-2xl border border-white/10">

        <h1 className="text-3xl font-bold text-center">StreamPulse Login</h1>
        
        <form action={formAction} className="space-y-4">


          {/* Mostramos mensaje de error si existe en el estado */}
          {state.error && (
            <div className="p-3 text-sm bg-destructive/20 border border-destructive text-destructive-foreground rounded-lg">
              {state.error}
            </div>
          )}

          {/* Mensaje de éxito */}
          {state.success && (
            <div className="p-3 text-sm bg-green-500/20 border border-green-500 text-green-500 rounded-lg">
              ¡Login exitoso! Redirigiendo...
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" type="email" required className="w-full p-3 rounded-lg bg-background border border-white/20 outline-none focus:border-primary" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input name="password" type="password" required className="w-full p-3 rounded-lg bg-background border border-white/20 outline-none focus:border-primary" />
          </div>

          <SubmitButton />

          
        </form>

      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="w-full py-3 bg-primary rounded-lg font-semibold disabled:opacity-50">
      {pending ? "Validando..." : "Entrar"}
    </button>
  );
}

