---
title: 刷题日记day5-Y2K Accounting Bug
link: 刷题日记day5-Y2K Accounting Bug
catalog: true
lang: cn
date: 2022-09-19 22:20:00 
subtitle: 刷题第五天
tags:
- c++
- 算法
categories:
- [题目记录, 题单]
---
# 刷题日记day5-Y2K Accounting Bug

今天做核酸，租空调，坐了某lxc的非主流摩托车，感觉摩托是真的爽。🚀

这一题好像是关于千年虫病毒的吧（虽然题目和故事一点关系都没有😂）

{% links %}
- site: POJ-2586 Y2K Accounting Bug
  url: https://vjudge.net/problem/POJ-2586
  color: pink
{% endlinks %} 

## 题面

Accounting for Computer Machinists (ACM) has sufferred from the Y2K bug and lost some vital data for preparing annual report for MS Inc.
All what they remember is that MS Inc. posted a surplus or a deficit each month of 1999 and each month when MS Inc. posted surplus, the amount of surplus was s and each month when MS Inc. posted deficit, the deficit was d. They do not remember which or how many months posted surplus or deficit. MS Inc., unlike other companies, posts their earnings for each consecutive 5 months during a year. ACM knows that each of these 8 postings reported a deficit but they do not know how much. The chief accountant is almost sure that MS Inc. was about to post surplus for the entire year of 1999. Almost but not quite.

Write a program, which decides whether MS Inc. suffered a deficit during 1999, or if a surplus for 1999 was possible, what is the maximum amount of surplus that they can post.

### input

> Input is a sequence of lines, each containing two positive integers s and d.

### output

> For each line of input, output one line containing either a single integer giving the amount of surplus for the entire year, or output Deficit if it is impossible.

### Sample

```
// input
59 237
375 743
200000 849694
2500000 8000000
// output
116
28
300612
Deficit
```

### 代码

```cpp
#include <iostream>

using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 1e5 + 5, M = 1e5 + 5, INF = 0x3f3f3f3f;
ll s, d;
int main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    while (cin >> s >> d) {
        ll ans = 0;
        ll cnt = -INF;
        int flag = 0;
        for (int i = 1; i <= 4; i++)
            if (s * i < d * (5 - i)) {
                cnt = max(s * i - d * (5 - i), cnt);
                flag = i;
            }
        if (flag == 1) ans = s - d + cnt * 2;
        else  ans = s * 2 + cnt * 2;
        if (flag && ans > 0) cout << ans << '\n';
        else cout << "Deficit\n";
    }
    return 0;
}
```

## 思路

这个题的意思是微软公司1999年这一年，每个月要么赚了s元，要么亏了d元，然后它还每5个月出一次财政报告，每次都是亏损的（就是这五个月整体亏损），就是1-5、2-6、3-7这样，问你微软公司这一年有没有可能盈利，然后输出最多盈利多少钱。

这一题很简单，可以无脑枚举，也可以稍微想一下，赚得最多的无非就是下面这几种：

```
ssssdssssdss	// 如果d>4*s的话，这样是赚得最多的。
sssddsssddss	// 如果2*d>3*s
ssdddssdddss	// 如果3*d>2*s
sddddsddddsd	// 如果4*d>s
dddddddddddd	// 这样是全亏。
```

枚举一下即可。

