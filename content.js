chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request === 'pull requests loaded') {
            addReviewedNav();
        }
    }
);

function addReviewedNav() {
    const navs = document.querySelector('.subnav-links');
    const reviewed = document.querySelector('.subnav-item__reviewed');
    if (navs && !reviewed) {
        var username = '';

        // get username from meta data
        const metas = document.getElementsByTagName('meta');
        for (var i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === 'user-login') {
                username = metas[i].getAttribute('content');
            }
        }

        // somehome github generates weird URLs for existing buttons once
        // Reviewed page is visited. Hacky way of removing "reviewed-by" search
        // query in the existing button URLs
        for (var j = 0; j < navs.children.length; j++) {
            const child = navs.children[j];
            const url = child.getAttribute('href').replace(`+reviewed-by%3A${username}`, '');
            child.href = url;
        }

        // add Reviewed button navigation
        const reviewedNav = document.createElement('a');
        reviewedNav.classList.add('js-selected-navigation-item');
        reviewedNav.classList.add('subnav-item');
        reviewedNav.classList.add('flex-1');
        reviewedNav.classList.add('text-center');
        reviewedNav.classList.add('subnav-item__reviewed');

        if (location.href.includes('reviewed-by')) {
            reviewedNav.classList.add('selected');
        }

        reviewedNav.href = `/pulls?q=is%3Aopen+is%3Apr+archived%3Afalse+reviewed-by%3A${username}`;
        reviewedNav.text = 'Reviewed';
        navs.appendChild(reviewedNav);
    }
}
