import Router from "./Router.js";
import renderAddPage from "../main.js";
import renderStreamers from "../listStreamers.js";

const routes = {
  streamers: { hash: "#streamers", function: renderStreamers },
  add: { hash: "#add", function: renderAddPage },
};

const router = new Router(routes);

router.urlResolve();
