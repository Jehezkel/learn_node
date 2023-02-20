#!/usr/bin/node
import { argv } from "process";
import { spider } from "./spider.js";

const [url, nesting] = [argv[2], argv[3]];
spider(url, nesting)
  .then(() => console.log("Download completed"))
  .catch((err) => console.error(err));
