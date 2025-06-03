export const useExternalScripts = () => {
  const loadScript = async (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        //eslint-disable-next-line no-console

        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        //eslint-disable-next-line no-console

        resolve();
      };
      script.onerror = () => {
        console.error(`Failed to load script: ${src}`);
        reject(new Error(`Failed to load script: ${src}`));
      };

      document.head.appendChild(script);
      //eslint-disable-next-line no-console
    });
  };

  const addInlineScript = (code: string, id?: string): void => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = code;

    if (id) {
      script.id = id;
    }

    document.head.appendChild(script);
    //eslint-disable-next-line no-console
  };

  return {
    loadScript,
    addInlineScript,
  };
};