import { MeshBasicMaterial, Group, Mesh } from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js';
import { SubdivisionModifier } from 'three/examples/jsm/modifiers/SubdivisionModifier.js';
import { saveAs } from 'file-saver';
import jQuery from 'jquery';
import { arrive } from 'arrive';
import { finalizeMesh } from './finalizeMesh.js';

function save_stl() {
    var smooth = jQuery('#subdivideSLT').val() > 0 ? jQuery('#subdivideSLT').val() : undefined;

    var group = process(CK.character, smooth);

    var exporter = new STLExporter();
    var fileString = exporter.parse(group);

    var name = get_name();

    var blob = new Blob([fileString], { type: "application/sla;charset=utf-8" });
    saveAs(blob, name + ((smooth) ? '-smooth' : '') + '.stl');
};

function save_obj() {
    var smooth = jQuery('#subdivideSLT').val();

    var group = process(CK.character, smooth);

    var exporter = new OBJExporter();
    var fileString = exporter.parse(group);

    var name = get_name();

    var blob = new Blob([fileString], { type: "text/plain;charset=utf-8" });
    saveAs(blob, name + ((smooth) ? '-smooth' : '') + '.obj');
};

function save_json(){
    var name = get_name();

    var blob = new Blob([JSON.stringify(CK.data.getJson())], {type: "text/plain;charset=utf-8"});

    saveAs(blob, name + ".json");
};

function load_json (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
            e.preventDefault();
            CK.change(JSON.parse(e.target.result));
        };
    })(file);

    if (file != undefined) reader.readAsText(file);
};

function get_name() {
    var getName = CK.character.data.meta.character_name;
    return getName === "" ? "Hero" : getName;
};

function subdivide(geometry, subdivisions) {
    var modifier = new SubdivisionModifier( subdivisions );
    var smoothGeometry = modifier.modify( geometry );
    return smoothGeometry;
};

function process(object3d, smooth) {
    var material = new MeshBasicMaterial();
    var group = new Group();

    object3d.traverseVisible(function (object) {
        if (object.isMesh) {

            var exporter = new finalizeMesh();
            var geometry = exporter.parse(object);

            if (smooth
                && object.name != 'baseRim'
                && object.name != 'base') {
                geometry = subdivide(geometry, smooth);
            }

            var mesh = new Mesh(geometry, material);

            group.add(mesh);
        }
    });
    return group;
};

document.body.arrive(".footer", { onceOnly: true, existing: true }, function () {
    jQuery('.headerMenu:last').remove();
    jQuery('a:contains(Log In)').remove();
    jQuery(".headerMenu-nav-item:contains(Save)").remove();
    jQuery(".headerMenu-nav-item:contains(Share)").remove();
    jQuery(".headerMenu-nav-item:contains(Heroes)").remove();
    jQuery(".editorFooter").empty();
    jQuery("li.tab-Material").remove();
    jQuery(".footer").empty();

    var style = { "margin-left": "20px", "font-size": "1.4em", "color": "rgba(255, 255, 255, 0.8)", "cursor": "pointer" };
      jQuery("<div/>", { class: "content-side", css: { "align-items": "center" } }).append([
      jQuery("<a />", { css: style, text: "STL" }).on("click", save_stl),
      jQuery("<a />", { css: style, text: "OBJ" }).on("click", save_obj),
      jQuery('<label />', { css: { "margin-left": "20px" }, for: 'subdivideSLT', text: 'Subdivision Passes' }),
      jQuery('<select />', { css: {"margin-left": "5px"}, id: 'subdivideSLT' })
        .append(new Option("0", 0))
        .append(new Option("1", 1))
        .append(new Option("2", 2))
    ]).insertAfter('.headerMenu-container:first');

    jQuery(".headerMenu-nav-scroll:first").append([
        jQuery('<a class="headerMenu-nav-item" href="#" target="_self"><div class="headerMenu-nav-item-img"><img src="/static/svg/character-menu/save.svg" width="20"></div><div class="headerMenu-nav-item-text">Save</div></a>').on("click", save_json),
        jQuery('<label for="load"><span class="headerMenu-nav-item" href="#" target="_self"><input type="file" id="load" name="load" style="display: none;"/><div class="headerMenu-nav-item-img"><img src="/static/svg/character-menu/folder.svg" width="20"></div><div class="headerMenu-nav-item-text">Load</div></span></label>').on("change", load_json)
    ]);
});
