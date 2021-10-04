/* SPDX-License-Identifier: Apache-2.0
 * Copyright (c) 2020 Intel Corporation
 */

$(document).ready(function () {
    var algoliaIndex = 'smart-edge-open';
    var landing = 'docs';
    var input = '.input-section';
    var output ='.output-section';
    var result ='#search-result';
    var pagination = '#search-result-pagination';

    var openness_search = instantsearch({
        appId: 'KTK1L88VUK',
        apiKey: '2c09d111435e53368ced940058c3ce41',
        indexName: algoliaIndex,
        routing: false,
        searchParameters: {
            hitsPerPage: 10,
        }
    });
    //alert (JSON.stringify(search));
    openness_search.addWidget(instantsearch.widgets.searchBox({
        container: input,
        placeholder: 'Search document',
        autofocus: false,
        poweredBy: true
    }));

    openness_search.addWidget(instantsearch.widgets.hits({
        container: result,
        templates: {
            empty: 'No results',
            item(hit) { 
            // console.log(hit)
            return  '<div class="search-item"><div class="columns-left-column"><a href="'+hit.path+'">'+hit.title+'</a></div></div>'

            }
        },
        transformData: {
            allItems: searchResults => {
                return searchResults;
            } 
        }
    }));

    openness_search.addWidget(instantsearch.widgets.pagination({
        container: pagination,
        maxPages: 20,
        scrollTo: false
    }));
    openness_search.start();

    var content = $(output).children();
        $(input).popover({
            html: true,
            placement: 'bottom',
            viewport: { selector: ".container-fluid", padding: 10 },
            content: function () {
                return content;
        }
    });

    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            if (!$(this).is(e.target)
                && $(this).has(e.target).length === 0
                && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $('.input-section').click(function (e) {
        if(e.target.className == "ais-search-box--input"){
            $(this).popover('show');
        }
   });
});