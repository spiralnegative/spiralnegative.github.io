/**
 * Main JS file for theme behaviours (dependency-free)
 */
(function () {
    "use strict";

    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    function debounce(func, threshold) {
        var timeout;
        return function () {
            var obj = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(obj, args);
            }, threshold || 100);
        };
    }

    // width/height attributes may be percentages ("100%"); only trust
    // plain pixel values for computing an aspect ratio
    function pixelAttribute(element, name) {
        var value = element.getAttribute(name);
        return /^\d+$/.test(value) ? parseInt(value, 10) : 0;
    }

    document.addEventListener("DOMContentLoaded", function () {
        var postContent = document.querySelector(".post-content"),
            videoSelector = [
                'iframe[src*="player.vimeo.com"]',
                'iframe[src*="youtube.com"]',
                'iframe[src*="youtube-nocookie.com"]',
                'iframe[src*="kickstarter.com"][src*="video.html"]',
                "object",
                "embed"
            ].join(", "),
            supportsAspectRatio = "aspectRatio" in document.documentElement.style;

        // Responsive video embeds (replaces jquery.fitvids.js):
        // size each video embed to its declared aspect ratio at full column width
        if (postContent) {
            postContent.querySelectorAll(videoSelector).forEach(function (frame) {
                var width = pixelAttribute(frame, "width"),
                    height = pixelAttribute(frame, "height"),
                    hasRatio = width > 0 && height > 0,
                    wrapper = document.createElement("div");

                wrapper.className = "fluid-width-video-wrapper";
                frame.parentNode.insertBefore(wrapper, frame);
                wrapper.appendChild(frame);

                if (supportsAspectRatio) {
                    frame.style.width = "100%";
                    frame.style.height = "auto";
                    frame.style.aspectRatio =
                        hasRatio ? width + " / " + height : "16 / 9";
                } else {
                    // fitvids-style padding hack for browsers without aspect-ratio
                    wrapper.style.position = "relative";
                    wrapper.style.paddingTop =
                        ((hasRatio ? height / width : 9 / 16) * 100) + "%";
                    frame.style.position = "absolute";
                    frame.style.top = "0";
                    frame.style.left = "0";
                    frame.style.width = "100%";
                    frame.style.height = "100%";
                }
            });
        }

        // Mark images wider than the post column so CSS can break them out
        if (postContent) {
            var images = document.querySelectorAll("img");

            var updateImageWidth = function (img) {
                if (img.naturalWidth >= postContent.offsetWidth) {
                    img.classList.add("full-img");
                } else {
                    img.classList.remove("full-img");
                }
            };

            images.forEach(function (img) {
                if (img.complete) {
                    updateImageWidth(img);
                } else {
                    img.addEventListener("load", function () {
                        updateImageWidth(img);
                    });
                }
            });

            window.addEventListener("resize", debounce(function () {
                images.forEach(updateImageWidth);
            }));
        }

        // Smooth scroll for anchors with an optional pixel offset
        // (replaces Arctic Scroll)
        document.querySelectorAll(".scroll-down").forEach(function (link) {
            link.addEventListener("click", function (event) {
                var target = link.hash && document.querySelector(link.hash),
                    offset = parseInt(link.getAttribute("data-offset"), 10) || 0,
                    top;

                if (!target) {
                    return;
                }
                event.preventDefault();
                top = target.getBoundingClientRect().top + window.pageYOffset + offset;
                if ("scrollBehavior" in document.documentElement.style) {
                    window.scrollTo({ top: top, behavior: "smooth" });
                } else {
                    window.scrollTo(0, top);
                }
            });
        });
    });
})();
