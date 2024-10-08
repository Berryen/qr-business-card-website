import Head from "next/head";
// import ytl_logo_icon from "assets/ytl_logo_icon.png";
// import ytl_logo from "assets/ytl_logo.jpg";
import logo_fyp from "assets/logo_fyp.png";

// ================= INTERFACES / TYPES
interface MetaProps {
  profile: ProfileInfo | null;
}
interface ProfileInfo {
  id: number;
  attributes: {
    name: string;
    company: string;
  };
}

export const Meta: React.FC<MetaProps> = ({ profile }) => {
  // ================= VARIABLES
  const companyName = profile?.attributes.company || "YTL Cement";
  const name = profile?.attributes.name || "";
  const title = `${companyName}${name ? " | " + name : ""}`;
  const logo_icon = logo_fyp.src;
  const logo = logo_fyp.src;

  // ================== VIEWS
  return (
    <Head>
      <link rel="icon" href={logo} />
      <link rel="apple-touch-icon" href={logo} />
      <title>{title}</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default Meta;
