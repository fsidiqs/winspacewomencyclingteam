import { HelmetProvider, Helmet } from "react-helmet-async";

const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <>
    <title>{title}</title>
    <meta name="description" content={description} />
  </>
);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export default PageMeta;
