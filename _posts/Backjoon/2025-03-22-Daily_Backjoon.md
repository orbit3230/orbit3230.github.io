---
layout: post
title: "[데일리 백준] 15687"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-22
last_modified_at: 2025-03-22
---
## Silver
### [15687][def]

```c++
class Rectangle {
    private:
    int width;
    int height;
    public:
    Rectangle(int width, int height) : width(width), height(height) {}
    int get_width() const { return width; }
    int get_height() const { return height; }
    void set_width(int w) { 
        if(w <= 0 || w > 1000) return;
        width = w;
    }
    void set_height(int h) {
        if(h <= 0 || h > 2000) return;
        height = h;
    }
    int area() const { return width * height; }
    int perimeter() const { return 2 * (width + height); }
    bool is_square() const { return width == height; }
};
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 클래스 구현 (날먹)  

</div>
</details>

[def]: https://www.acmicpc.net/problem/15687