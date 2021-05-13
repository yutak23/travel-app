export function removeIcon() {
    var icon = document.getElementById('icon');
    if (icon.firstChild) {
        icon.removeChild(icon.firstChild);
    }
}