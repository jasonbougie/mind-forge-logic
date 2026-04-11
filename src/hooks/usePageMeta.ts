import { useEffect } from "react";

interface UsePageMetaOptions {
  title: string;
  description?: string;
  robots?: string;
}

const usePageMeta = ({ title, description, robots }: UsePageMetaOptions) => {
  useEffect(() => {
    document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (meta) {
        meta.setAttribute("content", description);
      }
    }

    if (robots) {
      let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "robots";
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", robots);
    }

    return () => {
      // Reset to defaults on unmount
      document.title = "Dude Tan | Sunless Tanner for Men — Even It Out, Dude.";
      const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (meta) {
        meta.setAttribute("content", "Dude Tan is the first spray-on sunless tanner built specifically for men. Fix your farmer tan, sock tan, or t-shirt tan line in 60 seconds. Triple bronzer formula. No streaks, no smell, no salon.");
      }
      const robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      if (robotsMeta) {
        robotsMeta.setAttribute("content", "index, follow");
      }
    };
  }, [title, description, robots]);
};

export default usePageMeta;
