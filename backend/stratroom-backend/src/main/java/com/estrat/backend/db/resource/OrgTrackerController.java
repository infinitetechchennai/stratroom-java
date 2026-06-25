package com.estrat.backend.db.resource;

import com.estrat.backend.db.dto.ControlPanelGeneralDTO;
import com.estrat.backend.db.dto.OrgTrackerDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.ControlPanelGeneralService;
import com.estrat.backend.db.service.DeptTrackerService;
import com.estrat.backend.db.service.OrgTrackerService;
import com.estrat.backend.reactive.UserThreadLocalHelper;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RestController
public class OrgTrackerController {
    @Autowired
    public OrgTrackerService orgTrackerService;
    @Autowired
    public DeptTrackerService deptTrackerService;
    @Autowired
    public ControlPanelGeneralService controlPanelGeneralService;

    private long resolveOrgId() {
        String orgIdStr = UserThreadLocal.get("USER_ORG_ID");
        if (StringUtils.isBlank(orgIdStr)) {
            return 1L;
        }
        return Long.parseLong(orgIdStr);
    }

    private boolean isDepartmentMode(ControlPanelGeneralDTO controlPanelGeneral) {
        return controlPanelGeneral != null
                && "Department".equalsIgnoreCase(controlPanelGeneral.getImplementationType());
    }

    private String normalizeDatePeriod(String datePeriod) {
        if (datePeriod == null) {
            return "";
        }
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        return StringUtils.replaceEach(datePeriod, searchArray, replaceArray);
    }

    /**
     * Runs blocking work on a worker thread with the request's identity headers restored into
     * {@link UserThreadLocal}. The {@code ReactiveContextWebFilter} only populates the thread-local
     * on the request thread, so blocking controllers must re-bind it on their execution thread.
     */
    private <T> Mono<T> withRequestContext(ServerWebExchange exchange, java.util.concurrent.Callable<T> work) {
        return Mono.fromCallable(() -> {
            UserThreadLocalHelper.populateFromExchange(exchange);
            try {
                return work.call();
            } finally {
                UserThreadLocalHelper.clear();
            }
        }).subscribeOn(Schedulers.boundedElastic());
    }

    @GetMapping(value={"/orgTrackList"})
    public Mono<ResponseEntity<List<OrgTrackerDTO>>> findAll(@RequestParam(value="flagType") String flagType, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="id", required=false) String id, ServerWebExchange exchange) {
        String result = this.normalizeDatePeriod(flagType);
        String date = this.normalizeDatePeriod(datePeriod);
        return this.withRequestContext(exchange, () -> {
            ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(this.resolveOrgId());
            boolean listAll = StringUtils.isBlank(result) && StringUtils.isBlank(id);
            List<OrgTrackerDTO> orgTrackerDTOList;
            if (this.isDepartmentMode(controlPanelGeneral)) {
                orgTrackerDTOList = listAll
                        ? this.deptTrackerService.findAll(date)
                        : this.deptTrackerService.findAll(result, date, id);
            } else {
                orgTrackerDTOList = listAll
                        ? this.orgTrackerService.findAll(date)
                        : this.orgTrackerService.findAll(result, date);
            }
            return new ResponseEntity<>(orgTrackerDTOList, HttpStatus.OK);
        });
    }

    @GetMapping(value={"/orgTrackAllList"})
    public Mono<ResponseEntity<List<OrgTrackerDTO>>> orgTrackAllList(@RequestParam(value="datePeriod", required=false) String datePeriod, ServerWebExchange exchange) {
        String date = this.normalizeDatePeriod(datePeriod);
        return this.withRequestContext(exchange, () -> {
            ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(this.resolveOrgId());
            List<OrgTrackerDTO> orgTrackerDTOList = this.isDepartmentMode(controlPanelGeneral)
                    ? this.deptTrackerService.findAll(date)
                    : this.orgTrackerService.findAll(date);
            return new ResponseEntity<>(orgTrackerDTOList, HttpStatus.OK);
        });
    }

    @DeleteMapping(value={"/clearOrgTrack/{id}"})
    public Mono<ResponseEntity<Boolean>> clearOrgTrack(@PathVariable(value="id") Long id, @RequestParam(value="type", required=false) String type, ServerWebExchange exchange) {
        return this.withRequestContext(exchange, () -> {
            ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(this.resolveOrgId());
            if (this.isDepartmentMode(controlPanelGeneral)) {
                this.deptTrackerService.clearDeptTracker(id, type);
            } else {
                this.orgTrackerService.clearOrgTracker(id, type);
            }
            return new ResponseEntity<>(true, HttpStatus.OK);
        });
    }

    @GetMapping(value={"/orgTrackSearchList"})
    public Mono<ResponseEntity<List<OrgTrackerDTO>>> orgTrackSearchList(@RequestParam(value="flagType") String flagType, @RequestParam(value="datePeriod", required=false) String datePeriod, ServerWebExchange exchange) {
        String result = this.normalizeDatePeriod(flagType);
        String date = this.normalizeDatePeriod(datePeriod);
        return this.withRequestContext(exchange, () -> {
            ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(this.resolveOrgId());
            List<OrgTrackerDTO> orgTrackerDTOList = this.isDepartmentMode(controlPanelGeneral)
                    ? this.deptTrackerService.deptTrackSearchList(result, date)
                    : this.orgTrackerService.orgTrackSearchList(result, date);
            return new ResponseEntity<>(orgTrackerDTOList, HttpStatus.OK);
        });
    }
}
