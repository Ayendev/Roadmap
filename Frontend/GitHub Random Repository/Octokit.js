
const queryString = `language:JavaScript`;

let repo;

(async () => {
    let response = await octokit.request('GET /search/repositories', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'Accept': 'application/vnd.github+json'
        },
        q: queryString
    });

    let {items} = await response.data;
    repo = items.splice(3)
    console.log(items);
    console.log(repo);

})();



//------------------------
function Research() {

    Execute();
    //default message displayed
    info_.textContent = "Loading please wait..";

    let IdTimeout = setTimeout(()=> {

        // Verify
        if (repositories?.length > 0) {

            info_.textContent = repositories.find((element) => {
                element.language == element_select.value;
            });

        }else {

            info_.textContent = "Error fetching repositories.";
            info_.style.color = "red";

        }
    },100);
}

