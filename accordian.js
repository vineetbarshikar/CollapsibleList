const data = {
    "CollapsibleLists": {
        "Actions": {
            "Creation": {
                "apply": "",
                "applyTo": ""
            },
            "Toggling": {
                "Expanding/opening": "",
                "Collapsing/closing": ""
            }
        },
        "Uses": {
            "DirectoryListings": "",
            "Tree views": "",
            "Outline views": ""
        }
    }
};

class Accordian {
    constructor(elem, data){
        this.validate(elem, data);
        this.elem = elem;
        this.data = data;
        this.draw(this.data, document.querySelector(elem));
        this.init();
    }

    validate(elem, data) {
        if (!elem || typeof elem !== 'string' ||
            !document.querySelector(elem) ||
            !data || typeof data !== 'object') {
                throw new Error("Invalid input");
            }
    }

    draw(data, parent) {
        if (!data) return;

        let ul;
        if (Object.entries(data).length > 0) {
            ul = document.createElement("ul");
            ul.classList.add("clist-ul");
            ul.style.display = "none";
            parent.append(ul);
        }

        for (let [key, val] of Object.entries(data)) {
            const li = document.createElement("li");
            li.classList.add("clist-li");

            if (val) {
                const button = document.createElement("button");
                button.classList.add("clist-btn");
                button.innerText = "+";
                li.append(button);
            }

            const div = document.createElement("div");
            div.classList.add("clist-div");
            
            const span = document.createElement("span");
            span.classList.add("clist-span");
            span.innerText = key;
            
            li.append(div);
            div.append(span);
            ul.append(li);

            this.draw(val, div);
        }
    }

    init() {
        const rootUl = document.querySelector(this.elem + " > .clist-ul");
        rootUl.style.display = "block";

        rootUl.addEventListener("click", (event) => {
            if (!event.target.classList.contains("clist-btn")) return;

            const childUl = event.target.nextElementSibling.querySelector(".clist-ul");
            childUl.style.display = childUl.style.display === "block" ? "none" : "block";

            event.target.innerText = event.target.innerText === "+" ? "-" : "+";
        })
    }
}

new Accordian(".secondary-nav", data);