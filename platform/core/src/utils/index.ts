import absoluteUrl from './absoluteUrl';
import addAccessors from './addAccessors';
import b64toBlob from './b64toBlob.js';
import { createStudyBrowserTabs } from './createStudyBrowserTabs';
import debounce from './debounce';
import downloadCSVReport from './downloadCSVReport';
import formatDate from './formatDate';
import formatPN from './formatPN';
import formatTime from './formatTime';
import generateAcceptHeader from './generateAcceptHeader';
import guid from './guid';
import hierarchicalListUtils from './hierarchicalListUtils';
import hotkeys from './hotkeys';
import imageIdToURI from './imageIdToURI';
import isDicomUid from './isDicomUid';
import isDisplaySetReconstructable from './isDisplaySetReconstructable';
import isEqualWithin from './isEqualWithin';
import { isImage } from './isImage';
import isLowPriorityModality from './isLowPriorityModality';
import { defaultLogger, Logger } from './logger';
import makeCancelable from './makeCancelable';
import makeDeferred from './makeDeferred';
import ObjectPath from './objectPath';
import progressTrackingUtils from './progressTrackingUtils';
import Queue from './Queue';
import resolveObjectPath from './resolveObjectPath';
import roundNumber from './roundNumber';
import { sopClassDictionary } from './sopClassDictionary';
import sortBy from './sortBy.js';
import sortInstancesByPosition from './sortInstancesByPosition';
import {
  seriesSortCriteria,
  sortingCriteria,
  sortStudy,
  sortStudyInstances,
  sortStudySeries,
} from './sortStudy';
import { getSplitParam, splitComma } from './splitComma';
//import loadAndCacheDerivedDisplaySets from './loadAndCacheDerivedDisplaySets.js';
import urlUtil from './urlUtil';
import uuidv4 from './uuidv4';
import writeScript from './writeScript.js';

// Commented out unused functionality.
// Need to implement new mechanism for derived displaySets using the displaySetManager.

const utils = {
  guid,
  uuidv4,
  ObjectPath,
  absoluteUrl,
  sortBy,
  sortBySeriesDate: sortStudySeries,
  sortStudy,
  sortStudySeries,
  sortStudyInstances,
  sortingCriteria,
  seriesSortCriteria,
  writeScript,
  formatDate,
  formatTime,
  formatPN,
  b64toBlob,
  urlUtil,
  imageIdToURI,
  //loadAndCacheDerivedDisplaySets,
  makeDeferred,
  makeCancelable,
  hotkeys,
  Queue,
  isDicomUid,
  isEqualWithin,
  sopClassDictionary,
  addAccessors,
  resolveObjectPath,
  hierarchicalListUtils,
  progressTrackingUtils,
  isLowPriorityModality,
  isImage,
  isDisplaySetReconstructable,
  debounce,
  roundNumber,
  downloadCSVReport,
  splitComma,
  getSplitParam,
  generateAcceptHeader,
  createStudyBrowserTabs,
  defaultLogger,
  Logger,
};

export {
  guid,
  ObjectPath,
  absoluteUrl,
  sortBy,
  formatDate,
  writeScript,
  b64toBlob,
  urlUtil,
  //loadAndCacheDerivedDisplaySets,
  makeDeferred,
  makeCancelable,
  hotkeys,
  Queue,
  isDicomUid,
  isEqualWithin,
  resolveObjectPath,
  hierarchicalListUtils,
  progressTrackingUtils,
  isLowPriorityModality,
  isImage,
  isDisplaySetReconstructable,
  sortInstancesByPosition,
  imageIdToURI,
  debounce,
  roundNumber,
  downloadCSVReport,
  splitComma,
  getSplitParam,
  generateAcceptHeader,
  createStudyBrowserTabs,
  defaultLogger,
  Logger,
};

export default utils;
