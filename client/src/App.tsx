import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { MainNav } from "@/components/main-nav";
import Home from "@/pages/home";
import Game from "@/pages/game";
import AuthPage from "@/pages/auth-page";
import Rankings from "@/pages/rankings";
import ProxyPage from "@/pages/proxy";
import { createRoot } from "react-dom/client";
import "./index.css";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <Switch>
        <ProtectedRoute path="/" component={Home} />
        <ProtectedRoute path="/game/:id" component={Game} />
        <ProtectedRoute path="/rankings" component={Rankings} />
        <Route path="/proxy" component={ProxyPage} />
        <Route path="/auth" component={AuthPage} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

export default App;
