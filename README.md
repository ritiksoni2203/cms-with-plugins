# CMS with Plugin System

A powerful Content Management System (CMS) that allows users to create and manage posts and pages, and extend its functionality through plugins.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Running Locally](#running-locally)
- [Core Plugin System](#core-plugin-system)
  - [Plugin Structure](#plugin-structure)
  - [Plugin API](#plugin-api)
  - [Creating Plugins](#creating-plugins)
- [Example Plugin](#example-plugin)
- [Deployment](#deployment)
  - [Deploy on Vercel](#deploy-on-vercel)
  - [Deploy on Railway](#deploy-on-railway)
- [License](#license)

---

## Overview

This CMS enables content creation and management through a simple user interface. Additionally, it allows the installation and integration of plugins to extend its functionality.

---

## Features

- **Post and Page Management**: Create, read, update, and delete posts/pages.
- **Plugin System**: Install and manage plugins to enhance CMS features.
- **WYSIWYG Editor**: Rich text editing for posts and pages.
- **Responsive Design**: Fully responsive CMS and editor interface.

---

## Installation

### Prerequisites

- **Node.js** (v14 or later)
- **PostgreSQL** or **MySQL** (or any preferred database)
- **Git**

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ritiksoni2203/cms-with-plugins
   cd cms-with-plugins

2. Install dependencies:
npm install

3. Set up your database:
DATABASE_URL="postgresql://postgres:KDmqxkDUgAKkqcudcRuBbWlWDJWJZAYH@autorack.proxy.rlwy.net:27619/railway"

Running Locally

Start the development server:
npm run dev
