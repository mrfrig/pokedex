type CacheEntry<T> = {
  createdAt: number;
  val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop()
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val
    });
  }

  get<T>(key: string): T | undefined {
    const cache = this.#cache.get(key);
    return cache ? cache.val : undefined;
  }

  #reap() {
    for (const [key, val] of this.#cache) {
      if (val.createdAt < Date.now() - this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}