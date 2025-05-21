document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.desktop-icon');
    let draggedIcon = null;

    icons.forEach(icon => {
        icon.addEventListener('mousedown', (e) => {
            draggedIcon = icon;
            const rect = icon.getBoundingClientRect();
            icon.offsetX = e.clientX - rect.left;
            icon.offsetY = e.clientY - rect.top;
            icon.style.position = 'absolute';
            icon.style.zIndex = 1000;
            document.body.append(icon);
        });

        icon.addEventListener('mousemove', (e) => {
            if (draggedIcon) {
                draggedIcon.style.left = `${e.clientX - draggedIcon.offsetX}px`;
                draggedIcon.style.top = `${e.clientY - draggedIcon.offsetY}px`;
            }
        });

        icon.addEventListener('mouseup', () => {
            draggedIcon = null;
        });

        icon.addEventListener('mouseleave', () => {
            draggedIcon = null;
        });
    });
});
