/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dao.KPIDetailsRepository
 *  com.estrat.backend.db.dao.KPIRepository
 *  com.estrat.backend.db.dao.SubKPIRepository
 *  com.estrat.backend.db.generators.NodeKeyGenerators
 *  org.hibernate.HibernateException
 *  org.hibernate.engine.jdbc.spi.JdbcCoordinator
 *  org.hibernate.engine.jdbc.spi.ResultSetReturn
 *  org.hibernate.engine.jdbc.spi.StatementPreparer
 *  org.hibernate.engine.spi.SharedSessionContractImplementor
 *  org.hibernate.id.IdentifierGenerator
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.generators;

import com.estrat.backend.db.dao.KPIDetailsRepository;
import com.estrat.backend.db.dao.KPIRepository;
import com.estrat.backend.db.dao.SubKPIRepository;
import java.io.Serializable;
import java.util.Objects;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NodeKeyGenerators
implements IdentifierGenerator {
    @Autowired
    private KPIRepository kpiRepository;
    @Autowired
    private SubKPIRepository subkpiRepository;
    @Autowired
    private KPIDetailsRepository kpielementRepo;
    public Long generateNodeKey() {
        Long maxOfKpi = this.kpiRepository.maxkpi();
        Long maxOfElement = this.kpielementRepo.maxnodeKey();
        Long maxOfSubKpi = this.subkpiRepository.maxsubkpi();
        Long highestValue = 0L;
        if (Objects.nonNull(maxOfElement) && maxOfElement > highestValue) {
            highestValue = maxOfElement;
        }
        if (Objects.nonNull(maxOfKpi) && maxOfKpi > highestValue) {
            highestValue = maxOfKpi;
        }
        if (Objects.nonNull(maxOfSubKpi) && maxOfSubKpi > highestValue) {
            highestValue = maxOfSubKpi;
        }
        return highestValue + 1L;
    }

    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        return generateNodeKey();
    }
}

