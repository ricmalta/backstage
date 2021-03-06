/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Entity } from '@backstage/catalog-model';
import { Route, Routes } from 'react-router-dom';

import { rootCatalogKubernetesRouteRef } from './plugin';
import { KubernetesContent } from './components/KubernetesContent';
import { WarningPanel } from '@backstage/core';

const KUBERNETES_ANNOTATION = 'backstage.io/kubernetes';

export const Router = ({ entity }: { entity: Entity }) => {
  const kubernetesAnnotationValue =
    entity.metadata.annotations?.[KUBERNETES_ANNOTATION];

  if (!kubernetesAnnotationValue) {
    return (
      <WarningPanel title="Kubernetes plugin:">
        <pre>{KUBERNETES_ANNOTATION}</pre> annotation is missing on the entity.
      </WarningPanel>
    );
  }

  return (
    <Routes>
      <Route
        path={`/${rootCatalogKubernetesRouteRef.path}`}
        element={<KubernetesContent entity={entity} />}
      />
    </Routes>
  );
};
