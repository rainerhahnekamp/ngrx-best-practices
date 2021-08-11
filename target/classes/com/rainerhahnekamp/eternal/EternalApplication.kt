package com.rainerhahnekamp.eternal

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class EternalApplication

fun main(args: Array<String>) {
  runApplication<EternalApplication>(*args)
}
