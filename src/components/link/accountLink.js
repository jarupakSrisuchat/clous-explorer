import { Link as ReachLink, useParams } from "react-router-dom";
import Link from "./baseLink";

export default function AccountLink({
  children,
  title,
  address,
  type = "address",
}) {
  const { chain } = useParams();
  return (
    <Link as={ReachLink} to={"/" + chain + "/" + type + "/" + address}>
      {children}
    </Link>
  );
}
