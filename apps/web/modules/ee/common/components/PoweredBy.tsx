import Link from "next/link";

import { useIsEmbed } from "@calcom/embed-core/embed-iframe";
import { APP_NAME, POWERED_BY_URL } from "@calcom/lib/constants";
import { useLocale } from "@calcom/lib/hooks/useLocale";

const PoweredByCal = ({
  logoOnly,
  hasValidLicense,
}: {
  logoOnly?: boolean;
  hasValidLicense?: boolean | null;
}) => {
  const { t } = useLocale();
  const isEmbed = useIsEmbed();
  const hasCustomBrandIcon = !!process.env.NEXT_PUBLIC_BRAND_FAVICON_SVG_URL;

  return (
    <div className={`p-2 text-center text-xs sm:text-right${isEmbed ? " max-w-3xl" : ""}`}>
      <Link href={POWERED_BY_URL} target="_blank" className="text-subtle">
        {!logoOnly && <>{t("powered_by")} </>}
        {APP_NAME === "Cal.com" || !hasValidLicense ? (
          <>
            <img
              className="-mt-px inline h-[10px] w-auto dark:invert"
              src={`${process.env.NEXT_PUBLIC_WEBAPP_URL}/api/logo`}
              alt={`${APP_NAME} Logo`}
            />
          </>
        ) : hasCustomBrandIcon ? (
          <>
            <img
              className="-mt-px inline h-[10px] w-auto dark:hidden"
              src={`${process.env.NEXT_PUBLIC_WEBAPP_URL}/api/logo?type=icon&theme=light`}
              alt={`${APP_NAME} Logo`}
            />
            <img
              className="-mt-px hidden h-[10px] w-auto dark:inline"
              src={`${process.env.NEXT_PUBLIC_WEBAPP_URL}/api/logo?type=icon&theme=dark`}
              alt={`${APP_NAME} Logo`}
            />
          </>
        ) : (
          <span className="text-emphasis font-semibold opacity-50 hover:opacity-100">{APP_NAME}</span>
        )}
      </Link>
    </div>
  );
};

export default PoweredByCal;
