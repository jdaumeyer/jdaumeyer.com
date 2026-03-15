import pluginWebc from "@11ty/eleventy-plugin-webc";
import { RenderPlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
    // Watch CSS files
    eleventyConfig.addWatchTarget("css/**/*.css");

    eleventyConfig.addBundle("css", {
	toFileDirectory: "dist",
	// Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
	// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
	bundleHtmlContentFromSelector: "style",
    });
    
    // Bundle <script> content and adds a {% js %} paired shortcode
    eleventyConfig.addBundle("js", {
	toFileDirectory: "dist",
	// Add all <script> content to the `js` bundle (use <script eleventy:ignore> to opt-out)
	// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
	bundleHtmlContentFromSelector: "script",
    });

    eleventyConfig.addPassthroughCopy("**/*.png");

    // eleventyConfig.addPlugin(pluginWebc, {
    //     components: "_components/**/*.webc",
    // });
    eleventyConfig.addPlugin(RenderPlugin);

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

    eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
	const ignoredTags = ["all", "nav", "home", "posts"]
	return (tags || []).filter(tag => ignoredTags.indexOf(tag) === -1);
    });

    eleventyConfig.addFilter("alphabetically", strings =>
	(strings || []).sort((b, a) => b.localeCompare(a))
    );

    eleventyConfig.addFilter("getKeys", target => {
	return Object.keys(target);
    });

};
