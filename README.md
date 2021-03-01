[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
![Size][size-shield]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/https://github.com/PROJECT-Resistance/Resistance-Bot">
    <img src="https://i.ibb.co/SxMRSKw/resistance-chan-pfp.png" alt="Logo" width="180" height="180">
  </a>

  <h3 align="center">Resistance-chan</h3>

  <p align="center">
    A Discord bot for the Resistance Project.
    <br />
    <a href="https://github.com/PROJECT-Resistance/Resistance-Bot/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/PROJECT-Resistance/Resistance-Bot/issues">Give Feedback</a>
    ·
    <a href="https://github.com/PROJECT-Resistance/Resistance-Bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/PROJECT-Resistance/Resistance-Bot/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

  <a href="https://github.com/https://github.com/PROJECT-Resistance/Resistance-Bot">
    <img src="https://i.ibb.co/HGypspc/resistance-chan-first-snow.png" alt="Logo" width="579" height="748">
  </a>

This is Resistance-chan, also known as Resi. She's a Discord bot built with Node.js and the discord.js library. Resi provides a handful of fun and helpful commands for the "PROJECT: Resistance" Discord server, and she can be expanded easily with modular commands.

Features:
* Modular command and event loading for easy modification
* Persistent per-server settings
* Can be self hosted (tutorial will be added to the wiki)

If you have any questions, ideas for new features, any problems you need help solving, or even some improvements, feel free to open an [issue](https://github.com/PROJECT-Resistance/Resistance-Bot/issues).

Special thanks to Mk_TheOnePixel for providing artwork and assets. :smile:

### Built With

Resi was made using the following projects:
* [Node.js](https://nodejs.org/)
* [discord.js](https://discord.js.org/#/)
* [Enmap](https://www.npmjs.com/package/enmap)



<!-- GETTING STARTED -->
## Getting Started

Follow these steps to install Resi on your machine. These instructions are meant for advanced users, but a more detailed tutorial for less advanced users will be added to the wiki soon.

### Prerequisites

First you need to have [Node.js](https://nodejs.org/) (and npm) installed on your computer. After that make sure npm is up-to-date:
```sh
npm i -g npm
```

You also need [git](https://git-scm.com/) if you want to make contributions or download updates.

You will need a Discord bot application and its token, you can follow the steps in the [wiki](https://github.com/PROJECT-Resistance/Resistance-Bot/wiki) for that.

### Installation

1. Clone the Repo or download and unzip the code from the [releases](https://github.com/PROJECT-Resistance/Resistance-Bot/releases) page
	```sh
	git clone https://github.com/PROJECT-Resistance/Resistance-Bot.git
	```

2. Go into the downloaded folder
	```sh
	cd Resistance-Bot
	```

3. Create a JSON file called `config.json`
	```sh
	touch config.json
	```

4. And put in the following text
	```json
	{
	  "token": "YOUR_TOKEN_HERE",
	  "prefix": "!",
	  "ownerID": "YOUR_DISCORD_ID_HERE"
	}
	```
	Make sure to replace `YOUR_TOKEN_HERE` and `YOUR_DISCORD_ID_HERE` with real values.

5. Install the dependencies (you can remove the `--only=prod` flag if you want to contribute to the code)
	```sh
	npm i --only=prod
	```
You're all done, read the next section to get the bot running.

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/https://github.com/PROJECT-Resistance/Resistance-Bot/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Animate.css](https://daneden.github.io/animate.css)
* [Loaders.css](https://connoratherton.com/loaders)
* [Slick Carousel](https://kenwheeler.github.io/slick)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/PROJECT-Resistance/Resistance-Bot?color=%233366ff&style=for-the-badge
[contributors-url]: https://github.com/PROJECT-Resistance/Resistance-Bot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/PROJECT-Resistance/Resistance-Bot?color=%233366ff&style=for-the-badge
[forks-url]: https://github.com/PROJECT-Resistance/Resistance-Bot/network/members
[stars-shield]: https://img.shields.io/github/stars/PROJECT-Resistance/Resistance-Bot?color=%233366ff&style=for-the-badge
[stars-url]: https://github.com/PROJECT-Resistance/Resistance-Bot/stargazers
[issues-shield]: https://img.shields.io/github/issues/PROJECT-Resistance/Resistance-Bot?color=%233366ff&style=for-the-badge
[issues-url]: https://github.com/PROJECT-Resistance/Resistance-Bot/issues
[license-shield]: https://img.shields.io/github/license/PROJECT-Resistance/Resistance-Bot?color=%233366ff&style=for-the-badge
[license-url]: https://github.com/PROJECT-Resistance/Resistance-Bot/blob/main/LICENSE.txt
[size-shield]: https://img.shields.io/github/repo-size/PROJECT-Resistance/Resistance-Bot?color=%233366ff&style=for-the-badge
[product-screenshot]: https://i.ibb.co/HGypspc/resistance-chan-first-snow.png
