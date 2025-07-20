import React from "react";
import { Outlet} from "react-router";

const RootLayout: React.FC = () => {
  // const token = useLoaderData();
  // const submit = useSubmit()

  // useEffect(() => {
  //   if (!token) {
  //     return
  //   }

  //   // if (token === 'EXPIRED') {
  //   //   submit(null, {action: '/logout', method: 'post'})
  //   //   return
  //   // }

  //   // setTimeout(() => {
  //   //   submit(null, {action: '/logout', method: 'post'})
  //   // }, tokenDuration)

  // }, [token, submit])

  return (
    <>
      <Outlet />
    </>
  );
}

export default RootLayout;