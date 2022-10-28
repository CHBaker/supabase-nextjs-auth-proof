import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { EnrollMFA } from "./EnrollMFA";

export function CheckMFA() {
  const [readyToShow, setReadyToShow] = useState(false);
  const [showMFAScreen, setShowMFAScreen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } =
          await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (error) {
          throw error;
        }

        console.log("mfa data ", data);

        if (data.nextLevel === "aal2" && data.nextLevel !== data.currentLevel) {
          setShowMFAScreen(true);
        }
      } finally {
        setReadyToShow(true);
      }
    })();
  }, []);

  return (
    <EnrollMFA
      onEnrolled={() => console.log("enrolled")}
      onCancelled={() => console.log("cancelled")}
    />
  );
}
