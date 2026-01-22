import React from 'react';
import ErrorFriendly from './ErrorFriendly';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Si hay un error, cambiamos el estado para mostrar la pantalla bonita
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Aquí podrías enviar el error a un servicio de reportes en el futuro
    console.error("Error capturado por el Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Si hay error, mostramos tu diseño bonito
      return <ErrorFriendly />;
    }

    // Si no hay error, mostramos la app normal
    return this.props.children; 
  }
}

export default ErrorBoundary;