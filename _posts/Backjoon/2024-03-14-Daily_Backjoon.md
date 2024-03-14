---
layout: post
title: "[데일리 백준] 10814"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-14
last_modified_at: 2024-03-14
---
## Silver
### [10814][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.StringTokenizer;

public class P_10814 {

public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int testCase = Integer.parseInt(input.readLine());
		List<Student> students = new ArrayList<Student>();
		String line;
		StringTokenizer tokenizer;
		int age;
		String name;
		for(int id = 0 ; id < testCase ; id++) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			age = Integer.parseInt(tokenizer.nextToken());
			name = tokenizer.nextToken();
			students.add(new Student(age, name, id));
		}
		
		students.sort(Comparator.naturalOrder());
		for(Student s : students)
			output.write(s.toString());
		
		output.flush();
		output.close();
	}
	
}
class Student implements Comparable<Student>{
	int age;
	String name;
	int id;
	public Student(int age, String name, int id) {
		this.age = age;
		this.name = name;
		this.id = id;
	}
	public int compareTo(Student other) {
		if(this.age - other.age != 0)
			return this.age - other.age;
		return this.id - other.id;
	}
	public String toString() {
		return String.format("%d %s\n", age, name);
	}
}
```

[def]: https://www.acmicpc.net/problem/10814