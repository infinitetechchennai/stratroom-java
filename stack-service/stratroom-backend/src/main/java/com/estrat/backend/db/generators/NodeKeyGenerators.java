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
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Objects;
import org.hibernate.HibernateException;
import org.hibernate.engine.jdbc.spi.JdbcCoordinator;
import org.hibernate.engine.jdbc.spi.ResultSetReturn;
import org.hibernate.engine.jdbc.spi.StatementPreparer;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class NodeKeyGenerators
implements IdentifierGenerator {
    @Value(value="${datasource}")
    private String datasource;
    @Autowired
    private KPIRepository kpiRepository;
    @Autowired
    private SubKPIRepository subkpiRepository;
    @Autowired
    private KPIDetailsRepository kpielementRepo;
    private static String mysql = "SELECT orgstructure.GenerateNodeKey() AS nodeKey FROM DUAL";
    private static String sql = "SELECT orgstructure.GenerateNodeKey() AS nodeKey";

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
        PreparedStatement preparedStatement = null;
        ResultSetReturn resultSetReturn = null;
        ResultSet resultSet = null;
        Long id = null;
        JdbcCoordinator transactionCoordinator = null;
        try {
            transactionCoordinator = session.getJdbcCoordinator();
            StatementPreparer preparer = transactionCoordinator.getStatementPreparer();
            System.out.println("SQL Server process");
            String nodeKeySql = this.datasource.equals("mysql") ? mysql : sql;
            preparedStatement = preparer.prepareStatement(nodeKeySql);
            resultSetReturn = transactionCoordinator.getResultSetReturn();
            resultSet = resultSetReturn.extract(preparedStatement, nodeKeySql);
            resultSet.next();
            id = resultSet.getLong("nodeKey");
            System.out.println("Node key :::::: " + id);
        }
        catch (SQLException e) {
            try {
                e.printStackTrace();
                throw new HibernateException((Throwable)e);
            }
            catch (Throwable throwable) {
                transactionCoordinator.getLogicalConnection().getResourceRegistry().release(preparedStatement);
                transactionCoordinator.getLogicalConnection().getResourceRegistry().release(resultSet, preparedStatement);
                throw throwable;
            }
        }
        transactionCoordinator.getLogicalConnection().getResourceRegistry().release((Statement)preparedStatement);
        transactionCoordinator.getLogicalConnection().getResourceRegistry().release(resultSet, (Statement)preparedStatement);
        return id;
    }
}

