import { FC, ReactNode } from "react";
import { Footer } from "../../Common/Footer";
import { Nav } from "../../Common/Nav";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <Nav />
        {children}
        <Footer />
      </Provider>
    </>
  );
};