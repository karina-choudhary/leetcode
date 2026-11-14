// Renamed to CustomMinHeap to completely prevent global scope naming conflicts
class CustomMinHeap {
    constructor(compareFn) {
        this.data = [];
        this.compare = compareFn;
    }
    push(val) {
        this.data.push(val);
        this.up(this.data.length - 1);
    }
    pop() {
        if (this.data.length === 0) return null;
        const top = this.data[0];
        const bottom = this.data.pop();
        if (this.data.length > 0) {
            this.data[0] = bottom;
            this.down(0);
        }
        return top;
    }
    peek() { return this.data.length > 0 ? this.data[0] : null; }
    size() { return this.data.length; }
    up(i) {
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.compare(this.data[i], this.data[p]) < 0) {
                [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
                i = p;
            } else break;
        }
    }
    down(i) {
        const len = this.data.length;
        while (i * 2 + 1 < len) {
            let left = i * 2 + 1, right = i * 2 + 2, best = left;
            if (right < len && this.compare(this.data[right], this.data[left]) < 0) best = right;
            if (this.compare(this.data[best], this.data[i]) < 0) {
                [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
                i = best;
            } else break;
        }
    }
}

function assignTasks(servers, tasks) {
    const m = tasks.length;
    const ans = new Array(m);

    // Initialized using CustomMinHeap
    const freeHeap = new CustomMinHeap((a, b) => a.weight !== b.weight ? a.weight - b.weight : a.idx - b.idx);
    const busyHeap = new CustomMinHeap((a, b) => {
        if (a.freeTime !== b.freeTime) return a.freeTime - b.freeTime;
        return a.weight !== b.weight ? a.weight - b.weight : a.idx - b.idx;
    });

    for (let i = 0; i < servers.length; i++) {
        freeHeap.push({ weight: servers[i], idx: i });
    }

    let currTime = 0;
    for (let j = 0; j < m; j++) {
        currTime = Math.max(currTime, j);

        while (busyHeap.size() > 0 && busyHeap.peek().freeTime <= currTime) {
            let s = busyHeap.pop();
            freeHeap.push({ weight: s.weight, idx: s.idx });
        }

        if (freeHeap.size() === 0) {
            currTime = busyHeap.peek().freeTime;
            while (busyHeap.size() > 0 && busyHeap.peek().freeTime <= currTime) {
                let s = busyHeap.pop();
                freeHeap.push({ weight: s.weight, idx: s.idx });
            }
        }

        let server = freeHeap.pop();
        ans[j] = server.idx;
        
        busyHeap.push({ weight: server.weight, idx: server.idx, freeTime: currTime + tasks[j] });
    }

    return ans;
}
