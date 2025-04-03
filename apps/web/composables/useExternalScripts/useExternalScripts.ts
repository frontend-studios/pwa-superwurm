export const useExternalScripts = () => {
    const loadScript = async (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
  
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.async = true;
  
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
  
        document.head.appendChild(script);
      });
    };
  
    const addInlineScript = (code: string): void => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.textContent = code;
  
      document.head.appendChild(script);
    };
  
    return {
      loadScript,
      addInlineScript,
    };
  };