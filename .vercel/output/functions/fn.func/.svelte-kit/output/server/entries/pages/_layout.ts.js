import { inject } from "@vercel/analytics";
import "../../chunks/client.js";
inject({ mode: "production" });
const prerender = true;
async function load({ url }) {
  return {
    url: url.pathname
  };
}
export {
  load,
  prerender
};
