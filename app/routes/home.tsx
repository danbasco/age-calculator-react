import type { Route } from "./+types/home";
import React from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Age Calculator App" },
    { name: "description", content: "Calculate your age with React!" },
  ];
}

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-9xl">Hello World</h1>
    </div>
  );
};

export default Home;
