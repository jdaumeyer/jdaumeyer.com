/* List of all tags that have a description and icon */
const taginfo = {
    work: {
	icon: "briefcase",
	description: "Stuff that shows off my abilities",
    },
    "default": {
	icon: "hashtag",
	description: "",
    },
};

const tagdescription = (tagname) => {
    if (!Object.hasOwn(taginfo, tagname)) {
	return taginfo["default"].description;
    }
    return taginfo[tagname].description;
};

const tagicon = (tagname) => {
    if (!Object.hasOwn(taginfo, tagname)) {
	return `<i class="fa fa-${taginfo["default"].icon}"></i>`;
    }
    return `<i class="fa fa-${taginfo[tagname].icon}"></i>`;
};

const filterTagList = (tags) => {
    const ignoredTags = ["all", "nav", "home", "posts"];
    return (tags || []).filter(tag => ignoredTags.indexOf(tag) === -1);
};

export {
    tagdescription,
    tagicon,
    filterTagList,
};
