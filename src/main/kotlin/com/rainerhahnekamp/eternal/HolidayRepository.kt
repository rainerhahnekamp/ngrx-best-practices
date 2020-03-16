package com.rainerhahnekamp.eternal

import org.springframework.data.repository.CrudRepository

interface HolidayRepository : CrudRepository<Holiday, Int> {
}
