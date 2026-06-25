/**
 * projects.js — YOUR CONTENT FILE
 * ================================
 * This is the only file you need to edit to manage your projects.
 *
 * To add a project: copy one of the objects below and paste it at the top
 *   of the array (newest first is recommended).
 *
 * Fields:
 *   title       (string)   — Project name
 *   description (string)   — 1–2 sentence summary shown on the card
 *   tags        (array)    — Tech stack labels, keep to 4–6 max
 *   github      (string)   — GitHub URL, or null to hide the button
 *   live        (string)   — Live site URL, or null to hide the button
 *   highlight   (boolean)  — Set to true to pin the card with an accent border (use sparingly)
 */

var PROJECTS = [
  {
    title: "LLM Observatory",
    description:
      "A full-stack platform for comparing and monitoring LLM outputs across providers. Features real-time logging, prompt history, and a React dashboard.",
    tags: ["FastAPI", "React", "PostgreSQL", "Docker", "Vercel", "OpenAI"],
    github: "https://github.com/PaytonButler",
    live: "https://llm-observatory-gamma.vercel.app/",
    highlight: false,
  },
  {
    title: "CompLog",
    description:
      "A full-featured blog platform with threaded comments, likes, image uploads, and role-based admin. Built over a 16-week internship and deployed on Render.",
    tags: ["ASP.NET Core", "C#", "EF Core", "Azure"],
    github: "https://github.com/PaytonButler",
    live: "https://complog.org/",
    highlight: false,
  },
  {
    title: "BabyWireShark",
    description:
      "A lightweight network packet analyzer built in C that captures and decodes live traffic, inspired by Wireshark's core capture pipeline.",
    tags: ["C", "Networking", "Sockets", "PCAP"],
    github: "https://github.com/PaytonButler",
    live: null,
    highlight: false,
  },
  {
    title: "Flappy Bird",
    description:
      "A browser-based Flappy Bird clone with delta-time physics, smooth 60fps animation, and localStorage high score persistence.",
    tags: ["JavaScript", "Canvas API", "HTML5"],
    github: "https://github.com/PaytonButler/Flappy-Bird",
    live: "https://paytonbutler.github.io/Flappy-Bird",
    highlight: false,
  },
];