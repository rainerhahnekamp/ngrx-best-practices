package com.rainerhahnekamp.eternal

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController("/holiday")
class HolidayController(val repository: HolidayRepository) {
  @GetMapping
  fun list(): MutableIterable<Holiday> {
    return repository.findAll();
  }
}
