export default function(eleventyConfig) {
	// Watch CSS files
	eleventyConfig.addWatchTarget("css/**/*.css");

	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
		// Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "style",
	});

    eleventyConfig.addFilter('date', function(str) {
        return new Date(str).toISOString().split('T')[0];
    });
};
