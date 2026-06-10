/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.valve.EmbeddedValveCollection
 *  com.google.common.collect.Lists
 *  org.apache.catalina.Valve
 */
package com.estrat.web.valve;

import com.google.common.collect.Lists;
import java.util.ArrayList;
import java.util.List;
import org.apache.catalina.Valve;

@SuppressWarnings({"unchecked", "rawtypes"})
public class EmbeddedValveCollection {
    List valves = new ArrayList();

    public void addValve(Valve valve) {
        this.valves.add(valve);
    }

    public List getValves() {
        return this.valves;
    }

    public List withValves(Valve ... values) {
        this.valves.addAll(Lists.newArrayList((Object[])values));
        return this.valves;
    }
}

