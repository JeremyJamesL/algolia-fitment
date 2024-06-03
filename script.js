import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import { hits, configure } from "instantsearch.js/es/widgets";
import { connectSearchBox } from "instantsearch.js/es/connectors";

const searchBox = document.querySelector("#searchbox");
const filterByVin = document.querySelector("#vin-filter");
const resetBtn = document.querySelector("#reset");
const checkAutoAPI = document.querySelector("#check-api");
const modal = document.querySelector("#my_modal_1");

const searchClient = algoliasearch(
  "YSWWVAX5RB",
  "9fb3db0222f7b5aef0e2b30791ee6201"
);

const search = instantsearch({
  indexName: "kgk_PRODUCTS",
  searchClient,
  onStateChange({ uiState, setUiState }) {
    setUiState(uiState);
  },
});

const virtualSearchBox = connectSearchBox(() => {});

search.addWidgets([
  virtualSearchBox({}),
  configure({}),
  hits({
    container: "#hits",
    cssClasses: {
      list: "grid grid-cols-4 gap-5",
    },
    templates: {
      item(hit, { html }) {
        return html`
          <li class="card card-compact bg-base-100 shadow-xl relative">
            <div
              class="tooltip absolute top-1 right-1 align-right cursor-pointer"
              data-tip="Part number: ${hit.autotech_number}"
            >
              ℹ
            </div>
            <div
              style="background-image: url('${hit.image}')"
              class="w-full h-60 bg-cover bg-center"
            ></div>

            <div class="card-body">
              <h2 class="card-title">${hit.part_name}</h2>
              <p>${hit.manufacturer}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary bg-sky-500 border-0">
                  Buy Now
                </button>
              </div>
            </div>
          </li>
        `;
      },
    },
  }),
]);

search.start();

// searchBox.addEventListener("input", (e) => {
//   search.setUiState({
//     kgk_PRODUCTS: {
//       query: e.target.value,
//     },
//   });
// });

filterByVin.addEventListener("click", () => {
  const query = searchBox.value;

  search.setUiState({
    kgk_PRODUCTS: {
      configure: {
        filters: `arrayOfVins:${query}`,
      },
    },
  });
});

resetBtn.addEventListener("click", () => {
  searchBox.value = "";
  search.setUiState({
    kgk_PRODUCTS: {
      query: "",
      configure: {
        filters: "",
      },
    },
  });
});

checkAutoAPI.addEventListener("click", (e) => {
  modal.close();
  search.setUiState({
    kgk_PRODUCTS: {
      configure: {
        filters:
          "autotech_number:9383842938 OR autotech_number:1824948506 OR autotech_number:5253688994 OR autotech_number:2628575221 OR autotech_number:8264293220 OR autotech_number:9281980371 OR autotech_number:0791300404 OR autotech_number:6167291217 OR autotech_number:4924472735 OR autotech_number:5331393659 OR autotech_number:7789767305",
      },
    },
  });
});
