class ScrambleText {

    constructor(words = 'sugar honey ice tea') {
        this.words = words.match(/\w+/g);

        this.letters = [];
        this.counter = 0;

        this.chance = .2;

        this.delay = 2500;
        this.pause = 0;

        this.step = 20;
        this.accum = 0;

        this.from = 32;
        this.to = 126;

        this.alpha = 1;
    }

    update(deltaTime) {
        const { words, letters, counter, step, delay, from, to } = this;
        const { floor, random } = Math;

        this.accum += deltaTime;
        this.pause = (this.pause - deltaTime) % delay;

        while (this.accum > step) {
            this.accum -= step;
            if (this.pause > 0) return;

            if (letters.length < words[counter].length) {
                const rndRng = floor(random() * (to - from) + from);
                letters.push(String.fromCharCode(rndRng));
            } else if (letters.length > words[counter].length) {
                const rndPos = floor(random() * letters.length);
                letters.splice(rndPos, 1);
            }

            if (words[counter] == letters.join('')) {
                this.pause = delay;
                this.counter = (counter + 1) % words.length;
            } else if (words[counter] != letters.join('')) {
                const rndRng = floor(random() * (to - from) + from);
                const rndChar = String.fromCharCode(rndRng);
                const rndPos = floor(random() * letters.length);

                if (letters[rndPos] != words[counter][rndPos]) {
                    const char = random() > this.chance ? rndChar : words[counter][rndPos];
                    letters[rndPos] = char;
                }
            }

        }
    }

    render({ ctx, w, h }) {
        ctx.clearRect(0, 0, w, h);

        ctx.font = `600 150px comfortaa`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = 'orange';

        ctx.fillText(this.letters.join(''), w / 2, h / 2);
    }
}