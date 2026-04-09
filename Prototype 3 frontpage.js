let currentPage = null;

function setFeatured(r){
  $("#fTitle").textContent = r.t;
  $("#fDesc").textContent = r.d;
  $("#fTime").textContent = r.time;
  $("#fDiff").textContent = r.diff;
  $("#fRate").textContent = "★ " + (rate(r.id) ? `${rate(r.id)}/5` : "—");
}

function goToRecipe(id){
  window.location.href = `recipe.html?id=${encodeURIComponent(id)}`;
}

function makeItem(r){
  const item = document.createElement("li");
  item.className = "item";

  item.innerHTML = `
    <div class="poster" style="${posterStyle(r)}"></div>
    <div>
      <p class="itTitle">${escapeHtml(r.t)}</p>
      <p class="itMeta">${escapeHtml(r.time)} • ${escapeHtml(r.diff)} • ${escapeHtml(r.tags.join(", "))}</p>
    </div>
    <p class="itRate">★ ${rate(r.id) ? rate(r.id) + "/5" : "—"}</p>
  `;

  item.onclick = () => goToRecipe(r.id);
  item.onmouseenter = () => setFeatured(r);

  return item;
}

function renderList(ids){
  const searchValue = ($("#q").value || "").trim().toLowerCase();

  const recipes = ids
    .map(byId)
    .filter(Boolean)
    .filter(r => {
      if(!searchValue) return true;
      const text = (r.t + " " + r.d + " " + r.tags.join(" ") + " " + r.ing.join(" ")).toLowerCase();
      return text.includes(searchValue);
    });

  const list = $("#list");
  list.innerHTML = "";

  recipes.forEach(r => list.appendChild(makeItem(r)));

  $("#empty").textContent = t("noResults");
  $("#empty").hidden = recipes.length > 0;
}

function showPage(page){
  currentPage = page;

  $("#choose").hidden = true;
  $("#section").hidden = false;
  $("#q").value = "";

  if(page === "inspiration"){
    $("#sectionTitle").textContent = t("inspiration");
    $("#clearList").hidden = true;
    renderList(INSP);
    setFeatured(byId(INSP[0]));
  }

  if(page === "top10"){
    $("#sectionTitle").textContent = t("top10");
    $("#clearList").hidden = true;
    renderList(TOP10);
    setFeatured(byId(TOP10[0]));
  }

  if(page === "yourchoice"){
    $("#sectionTitle").textContent = t("yourchoice");
    $("#clearList").hidden = false;
    $("#clearList").textContent = t("clear");

    const listIds = get(LS_LIST, []);
    renderList(listIds);

    const first = listIds.map(byId).filter(Boolean)[0];
    if(first){
      setFeatured(first);
    } else {
      $("#fTitle").textContent = t("noSavedTitle");
      $("#fDesc").textContent = t("noSavedDesc");
      $("#fTime").textContent = "—";
      $("#fDiff").textContent = "—";
      $("#fRate").textContent = "★ —";
    }
  }

  closeLangDropdown();
  closeUserDropdown();
}

function goBack(){
  $("#section").hidden = true;
  $("#choose").hidden = false;
  $("#list").innerHTML = "";
  $("#empty").hidden = true;
  $("#q").value = "";

  const front = $("#frontSearch");
  if(front) front.value = "";

  currentPage = null;
  closeLangDropdown();
  closeUserDropdown();
}

function runFrontSearch(){
  const input = $("#frontSearch");
  if(!input) return;

  const value = input.value.trim().toLowerCase();
  if(!value) return;

  const results = RECIPES
    .filter(r => {
      const text = (
        r.t + " " +
        r.d + " " +
        r.tags.join(" ") + " " +
        r.ing.join(" ")
      ).toLowerCase();

      return text.includes(value);
    })
    .map(r => r.id);

  currentPage = "search";

  $("#choose").hidden = true;
  $("#section").hidden = false;
  $("#sectionTitle").textContent = t("searchResults");
  $("#clearList").hidden = true;
  $("#q").value = "";

  const list = $("#list");
  list.innerHTML = "";

  results.map(byId).filter(Boolean).forEach(r => {
    list.appendChild(makeItem(r));
  });

  $("#empty").textContent = t("noResults");
  $("#empty").hidden = results.length > 0;

  const first = results.map(byId).filter(Boolean)[0];
  if(first){
    setFeatured(first);
  } else {
    $("#fTitle").textContent = t("noSearchTitle");
    $("#fDesc").textContent = t("noSearchDesc");
    $("#fTime").textContent = "—";
    $("#fDiff").textContent = "—";
    $("#fRate").textContent = "★ —";
  }

  closeLangDropdown();
  closeUserDropdown();
}

function applyPageLanguage(){
  $("#chooseTitle").textContent = t("chooseTitle");

  const choices = $$(".choice");
  if(choices[0]){
    choices[0].querySelector(".choiceTag").textContent = t("inspiration").toUpperCase();
    choices[0].querySelector(".choiceSub").textContent = t("inspirationSub");
  }
  if(choices[1]){
    choices[1].querySelector(".choiceTag").textContent = t("top10").toUpperCase();
    choices[1].querySelector(".choiceSub").textContent = t("top10Sub");
  }
  if(choices[2]){
    choices[2].querySelector(".choiceTag").textContent = t("yourchoice").toUpperCase();
    choices[2].querySelector(".choiceSub").textContent = t("yourchoiceSub");
  }

  $(".frontSearchText").textContent = t("frontText");
  $("#frontSearch").placeholder = t("frontPlaceholder");
  $("#frontSearchBtn").textContent = t("frontButton");

  $("#q").placeholder = t("sectionPlaceholder");
  $("#clearList").textContent = t("clear");
  $("#backBtn").textContent = t("back");

  $("#feature").querySelector("p span").textContent = t("preview");
  if(!currentPage){
    $("#fDesc").textContent = t("previewDefault");
  }

  if(currentPage === "inspiration") $("#sectionTitle").textContent = t("inspiration");
  if(currentPage === "top10") $("#sectionTitle").textContent = t("top10");
  if(currentPage === "yourchoice") $("#sectionTitle").textContent = t("yourchoice");
  if(currentPage === "search") $("#sectionTitle").textContent = t("searchResults");
}

document.querySelectorAll(".choice").forEach(btn => {
  btn.onclick = () => showPage(btn.dataset.page);
});

$("#backBtn").onclick = goBack;

$("#q").oninput = () => {
  if(currentPage === "inspiration") renderList(INSP);
  if(currentPage === "top10") renderList(TOP10);
  if(currentPage === "yourchoice") renderList(get(LS_LIST, []));
};

$("#clearList").onclick = () => {
  set(LS_LIST, []);
  if(currentPage === "yourchoice"){
    renderList([]);
    $("#fTitle").textContent = t("noSavedTitle");
    $("#fDesc").textContent = t("noSavedDesc");
    $("#fTime").textContent = "—";
    $("#fDiff").textContent = "—";
    $("#fRate").textContent = "★ —";
  }
};

$("#frontSearchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  runFrontSearch();
});

applyPageLanguage();
