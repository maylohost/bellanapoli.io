"use client";
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function TestnetWarningModal() {
  const { address, isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Genera una chiave unica per questa sessione/connessione
    const getStorageKey = () => {
      if (isConnected && address) {
        // Se c'è un wallet connesso, usa l'address come chiave
        return `testnet_warning_dismissed_${address.toLowerCase()}`;
      }
      // Altrimenti usa una chiave di sessione
      return 'testnet_warning_dismissed_session';
    };

    // Controlla se il modal è già stato chiuso per questa connessione/sessione
    const storageKey = getStorageKey();
    const wasDismissed = localStorage.getItem(storageKey);

    if (!wasDismissed) {
      setIsOpen(true);
    }
  }, [isConnected, address]);

  const handleClose = () => {
    // Salva nel localStorage che è stato chiuso per questa connessione/sessione
    const getStorageKey = () => {
      if (isConnected && address) {
        return `testnet_warning_dismissed_${address.toLowerCase()}`;
      }
      return 'testnet_warning_dismissed_session';
    };

    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal - Stile come le card delle prediction */}
      <div className="relative rounded-xl border border-primary/20 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 shadow-md hover:shadow-lg transition-all duration-200 p-4 md:p-6 mx-4 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Icona warning */}
          <div className="flex justify-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          {/* Titolo */}
          <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white text-center">
            Periodo Testnet Terminato
          </h4>

          {/* Messaggio */}
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed text-center">
            Il periodo di testnet è attualmente terminato. La piattaforma potrebbe non essere completamente operativa.
            <br /><br />
            Resta sintonizzato per ulteriori aggiornamenti!
          </p>

          {/* Button - Stile come i pulsanti delle card */}
          <div className="pt-2">
            <button
              onClick={handleClose}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md text-sm md:text-base text-center transition-colors duration-200"
            >
              Ho capito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
