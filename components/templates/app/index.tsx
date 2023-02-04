import Head from "next/head";
import React, { FC, ReactElement } from "react";
import { Styles } from "./styles";

interface IAppProps {
  children: JSX.Element | JSX.Element[];
  title: string;
  description: string;
}

const AppTemplate: FC<IAppProps> = ({ children, title, description }): ReactElement => {
  return (
    <Styles>
      <Head>
        <title>{title} </title>
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <meta name="description" content={description} />
      </Head>

      {children && <div className="app-template__content">{children}</div>}
    </Styles>
  );
};

export default AppTemplate;
