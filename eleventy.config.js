// import pluginWebc from "@11ty/eleventy-plugin-webc";

import { RenderPlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

import { tagdescription, tagicon, filterTagList } from "./config/tags.js";

export default function(eleventyConfig) {
    // Watch CSS files
    eleventyConfig.addWatchTarget("css/**/*.css");

    // eleventyConfig.addCollection("posts", function (collectionApi) {
    // 	const posts = collectionApi.getFilteredByGlob("posts/*.md")
    // 	console.log(posts)
    // 	return posts;
    // });

    eleventyConfig.addBundle("css", {
	toFileDirectory: "dist",
	// Add all <style> content to `css` bundle
	// (use <style eleventy:ignore> to opt-out)
	// Supported selectors:
	// https://www.npmjs.com/package/posthtml-match-helper
	bundleHtmlContentFromSelector: "style",
    });
    
    // Bundle <script> content and adds a {% js %} paired shortcode
    eleventyConfig.addBundle("js", {
	toFileDirectory: "dist",
	// Add all <script> content to the `js` bundle
	// (use <script eleventy:ignore> to opt-out)
	// Supported selectors:
	// https://www.npmjs.com/package/posthtml-match-helper
	bundleHtmlContentFromSelector: "script",
    });

    eleventyConfig.addPassthroughCopy("**/*.png");

    // eleventyConfig.addPlugin(pluginWebc, {
    //     components: "_components/**/*.webc",
    // });
    eleventyConfig.addPlugin(RenderPlugin);

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
	// output image formats
	formats: ["webp"],

	// output image widths
	widths: [400, 800, "auto"],

	// optional, attributes assigned on <img> nodes override these values
	htmlOptions: {
	    imgAttributes: {
		loading: "lazy",
		decoding: "async",
	    },
	    pictureAttributes: {}
	},
    });

    eleventyConfig.addPlugin(feedPlugin, {
	type: "rss", 
	outputPath: "/feed.xml",
	collection: {
	    name: "posts", // iterate over `collections.posts`
	    limit: 10,     // 0 means no limit
	},
	metadata: {
	    language: "en",
	    title: "Jackie Daumeyer's Feed",
	    subtitle: "Words written by me.",
	    base: "https://jdaumeyer.com/",
	    author: {
		name: "Jackie Daumeyer",
		email: "mail@jdaumeyer.com", // Optional
	    }
	}
    });

    eleventyConfig.addFilter('date', function(str) {
        return new Date(str).toISOString().split('T')[0];
    });

    eleventyConfig.addFilter('await', function (promise, callback, result) {
	promise.then(result => {
	    callback(null, result);
	}).catch(err => {
	    callback(err);
	});
    }, true);

    eleventyConfig.addFilter("filterTagList", filterTagList);

    eleventyConfig.addFilter("alphabetically", strings => {
	return strings.sort((b, a) => b.localeCompare(a));
    });

    eleventyConfig.addFilter("getKeys", target => {
	return Object.keys(target);
    });

    eleventyConfig.addShortcode("tagdescription", tagdescription);

    eleventyConfig.addShortcode("tagicon", tagicon);

};
