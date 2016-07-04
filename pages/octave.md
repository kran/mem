Octove
====

octave 是 matlab 的复刻，兼容程度很高。在做ML的算法原型场合使用较多。

安装
----

macOS下只需要`brew install octave`, 依赖较多，可能需要等待较长时间。完成后有
`octave-cli`, `octave` 两个命令。`octave-cli`为命令行，另一个是带有GUI的版本。
命令行版本更加稳定。

octave画图需要`gnuplot`支持。在macOS下，X11并不完善。所以最好使用QT作为绘图控件：

`brew install gnuplot --with-qt`。

PS：不使用QT的话，GUI版本应该也可以很好的工作。


基本操作
----

矩阵操作
----

绘图
----

