/* let opt = {
    items: [],
    zones: [],
    zoneOver: null,
    // mobile: false
}; */

let onDnD = function(opt) {
    let items = opt.items || [];
    let zones = opt.zones || [];
    let zoneOver = opt.zoneOver;

    if (items.length == 0 ||
        zoneOver.length == 0 ||
        !zoneOver) return;

    
    let userAgent = navigator.userAgent.toLowerCase();
    let isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
    
    let itemSelected = null;
    let itemSelectedClone = null;
    let itemOnDrop = null;
    let dropZone = null;
    let appendType = null;


    let start = (event) => {
        let imgDrag = document.createElement('img');
        imgDrag.src = '';
        event.dataTransfer.setDragImage(imgDrag, 0, 0);

        itemSelected = event.target;
        itemSelected.classList.add('selected');
    };

    let end = (event) => {
        if (itemSelected) {
            itemSelected.classList.remove('selected');
            itemSelected.removeAttribute('style');
        }

        itemSelected = null;
        itemSelectedClone.remove();
        itemSelectedClone = null;

        if (itemOnDrop) itemOnDrop.style = '';
        itemOnDrop = null;

        if (dropZone) dropZone.classList.remove('enter');
        dropZone = null;

        appendType = null;
    };

    let enter = (event) => {
        if (dropZone) dropZone.classList.remove('enter');

        dropZone = getDropZone(event.target);
        
        if (dropZone) dropZone.classList.add('enter');

        if (itemOnDrop) itemOnDrop.style = '';

        itemOnDrop = event.target;
        if (!itemOnDrop ||
            !itemOnDrop.classList.contains('dnd-item') || 
            itemOnDrop == itemSelected) {
            itemOnDrop = null;
        }
    };

    let leave = (event) => {
        let dropZoneRelated = getDropZone(event.relatedTarget);

        if (!dropZoneRelated && dropZone) dropZone.classList.remove('enter');
    };

    let drop = (event) => {
        event.preventDefault();

        dropZone = getDropZone(event.target);

        if (itemSelected && dropZone) {
            if (!itemOnDrop) appendType = null;

            switch(appendType) {
                case 'bottom':
                case 'after': 
                    itemOnDrop.after(itemSelected);
                break;
                case 'top':
                case 'before':
                    itemOnDrop.before(itemSelected);
                break;
                default: dropZone.append(itemSelected);
            }
        }
    };

    let over = (event) => {
        event.preventDefault();

        if (itemSelected) {
            let gap = 10;
            let x = event.x + gap;
            let y = event.y + gap;

            itemSelected.style = `position: absolute; left: 0; top: 0; z-index: 10;`;
            itemSelected.style.transform = `translate(${x}px, ${y}px)`;
        }

        if (itemOnDrop) {
            let itemOnDropPosXHalf = itemOnDrop.offsetLeft + itemOnDrop.offsetWidth / 2;
            let x = event.clientX;

            let itemOnDropPosYHalf = itemOnDrop.offsetTop + itemOnDrop.offsetHeight / 2;
            let y = event.clientY;

            
            if (!isMobile) {
                if (x <= itemOnDropPosXHalf) {
                    appendType = 'before';
                    itemOnDrop.style.transform = 'translateX(5px)';
                } else if (x > itemOnDropPosXHalf) {
                    appendType = 'after';
                    itemOnDrop.style.transform = 'translateX(-5px)';
                }
            } else {
                if (y <= itemOnDropPosYHalf) {
                    appendType = 'top';
                    itemOnDrop.style.transform = 'translateY(5px)';
                } else if (y > itemOnDropPosYHalf) {
                    appendType = 'bottom';
                    itemOnDrop.style.transform = 'translateY(-5px)';
                }
            }
        }

        if (itemSelected && !itemSelectedClone) itemSelectedClone = itemSelected.cloneNode(true);
        
        if (itemSelectedClone) {
            itemSelectedClone.removeAttribute('style');
            itemSelectedClone.removeAttribute('draggable');
            itemSelectedClone.classList.remove('selected');
            itemSelectedClone.classList.add('cloned');

            if (!itemOnDrop) appendType = null;

            switch(appendType) {
                case 'bottom':
                case 'after': 
                    itemOnDrop.after(itemSelectedClone);
                break;
                case 'top':
                case 'before':
                    itemOnDrop.before(itemSelectedClone);
                break;
                default: dropZone.append(itemSelectedClone);
            }
        }
    };

    let overPrevent = (event) => {
        event.preventDefault();
    };

    let getDropZone = (target) => {
        if (!target) return;

        let element = target;
        if (!element.classList.contains('dnd-zone')) element = element.closest('.dnd-zone');

        return element;
    };


    items.forEach(element => {
        element.draggable = true;
        
        element.classList.add('dnd-item');

        element.addEventListener('dragstart', start);
        element.addEventListener('dragend', end);
    });


    zones.forEach(element => {
        element.classList.add('dnd-zone');

        element.addEventListener('dragenter', enter);
        element.addEventListener('dragleave', leave);
        element.addEventListener('drop', drop);
        element.addEventListener('dragover', overPrevent);
    });


    zoneOver.classList.add('dnd-zone-over');

    zoneOver.addEventListener('dragover', over);
};